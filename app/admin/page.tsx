"use client";

import { useEffect, useState } from "react";
import { db, auth } from "@/lib/firebase";
import { collection, getDocs, doc, updateDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image";

interface AdminProduct {
    id: string;
    name: string;
    price: number;
    imagem?: string;
}

export default function AdminPage() {
    const [products, setProducts] = useState<AdminProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [savingId, setSavingId] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    // Novos estados de Formulário de Cadastro
    const [showForm, setShowForm] = useState(false);
    const [isSavingNew, setIsSavingNew] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: "",
        category: "Oversized",
        price: 0,
        description: "",
        featured: false,
        imagem: "",
    });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser) {
                router.push("/login");
            } else {
                setUser(currentUser);
                fetchProducts();
            }
        });

        return () => unsubscribe();
    }, [router]);

    async function fetchProducts() {
        try {
            const querySnapshot = await getDocs(collection(db, "produtos"));
            const productsData: AdminProduct[] = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                productsData.push({
                    id: doc.id,
                    name: data.name,
                    price: data.price,
                    imagem: data.imagem,
                });
            });
            setProducts(productsData);
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
        } finally {
            setLoading(false);
        }
    }

    const handleUpdate = async (id: string, newName: string, newPrice: number, newImagem?: string) => {
        setSavingId(id);
        try {
            const productRef = doc(db, "produtos", id);
            await updateDoc(productRef, {
                name: newName,
                price: Number(newPrice),
                ...(newImagem && { imagem: newImagem }),
            });
            alert("Produto atualizado com sucesso!");
        } catch (error) {
            console.error("Erro ao atualizar produto:", error);
            alert("Erro ao atualizar produto.");
        } finally {
            setSavingId(null);
        }
    };

    const handleChange = (id: string, field: "name" | "price" | "imagem", value: string | number) => {
        setProducts((prev) =>
            prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
        );
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.push("/login");
        } catch (error) {
            console.error("Erro ao deslogar:", error);
        }
    };

    const generateSlug = (name: string) => {
        return name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    };

    const handleCreateProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newProduct.name || !newProduct.price || !newProduct.imagem) {
            alert("Preencha todos os campos obrigatórios e adicione uma imagem.");
            return;
        }

        setIsSavingNew(true);
        try {
            // 2. Gerar Slug / ID baseado no nome
            const slug = generateSlug(newProduct.name);
            const id = slug;

            // 3. Montar objeto do produto final
            const finalProduct = {
                id,
                name: newProduct.name,
                slug,
                price: Number(newProduct.price),
                featured: newProduct.featured,
                isNew: true,
                description: newProduct.description,
                imagem: newProduct.imagem,       // Campo de imagem retornado pelo UploadThing
                imageUrl: newProduct.imagem,     // Mantendo pro design atual
                images: [newProduct.imagem],     // Galeria passa a ter pelo menos 1 imagem
                sizes: ["P", "M", "G", "GG"], // Tamanhos padrão
                category: newProduct.category,
                details: { // Informações Padrão / Mockadas para facilitar
                    fabric: "Algodão Premium",
                    model: "Regular",
                    wash: "Amaciada"
                }
            };

            // 4. Salvar no Firestore
            await setDoc(doc(db, "produtos", id), finalProduct);
            alert("Produto cadastrado com sucesso!");

            // 5. Reset do Formulário e Fetch Reativo
            setShowForm(false);
            setNewProduct({ name: "", category: "Oversized", price: 0, description: "", featured: false, imagem: "" });
            fetchProducts();

        } catch (err) {
            console.error("Erro ao salvar o novo produto:", err);
            alert("Erro ao cadastrar novo produto. Veja o console.");
        } finally {
            setIsSavingNew(false);
        }
    };

    if (loading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white font-sans">
                <p className="text-hooke-900 font-bold uppercase tracking-widest text-xs">Acessando painel...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white p-8 font-sans pb-24">
            <div className="max-w-4xl mx-auto">

                {/* Cabeçalho */}
                <div className="flex items-center justify-between mb-10 border-b border-hooke-900 pb-6">
                    <div>
                        <h1 className="text-3xl font-black uppercase tracking-tighter text-hooke-900">Painel Admin</h1>
                        <p className="text-xs uppercase tracking-widest text-gray-400 mt-2">Logado como: {user.email}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setShowForm(!showForm)}
                            className="text-xs font-bold uppercase tracking-widest text-white bg-hooke-900 border border-hooke-900 px-6 py-3 hover:bg-black rounded-none transition-colors"
                        >
                            {showForm ? "CANCELAR" : "+ NOVO PRODUTO"}
                        </button>
                        <button
                            onClick={handleLogout}
                            className="text-xs font-bold uppercase tracking-widest text-hooke-900 hover:text-white transition-colors border border-hooke-900 px-6 py-3 hover:bg-hooke-900 rounded-none bg-white"
                        >
                            Sair
                        </button>
                    </div>
                </div>

                {/* Formulário de Criação Condicional */}
                {showForm && (
                    <div className="mb-12 p-8 border border-hooke-900 bg-gray-50">
                        <h2 className="text-xl font-black uppercase tracking-tighter text-hooke-900 mb-6">Cadastrar Novo Produto</h2>

                        <form onSubmit={handleCreateProduct} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Nome */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-hooke-900 block">Nome do Produto *</label>
                                    <input
                                        type="text"
                                        required
                                        value={newProduct.name}
                                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                        className="w-full border border-hooke-900 p-3 text-sm focus:outline-none focus:ring-1 focus:ring-hooke-900 transition-all rounded-none"
                                        placeholder="Ex: Camiseta Oversized Preta"
                                    />
                                </div>
                                {/* Categoria */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-hooke-900 block">Categoria *</label>
                                    <select
                                        value={newProduct.category}
                                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                                        className="w-full border border-hooke-900 p-3 text-sm focus:outline-none focus:ring-1 focus:ring-hooke-900 transition-all rounded-none bg-white"
                                    >
                                        <option value="Oversized">Oversized</option>
                                        <option value="Regatas">Regatas</option>
                                        <option value="Vintage">Vintage</option>
                                        <option value="Kits">Kits</option>
                                        <option value="Lifestyle">Lifestyle</option>
                                    </select>
                                </div>
                                {/* Preço */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-hooke-900 block">Preço (R$) *</label>
                                    <input
                                        type="number"
                                        required
                                        step="0.01"
                                        value={newProduct.price || ""}
                                        onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                                        className="w-full border border-hooke-900 p-3 text-sm focus:outline-none focus:ring-1 focus:ring-hooke-900 transition-all rounded-none"
                                        placeholder="Ex: 89.90"
                                    />
                                </div>
                                {/* Imagem */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-hooke-900 block">Foto do Produto *</label>
                                    {newProduct.imagem ? (
                                        <div className="flex items-center gap-4">
                                            <div className="relative w-16 h-16 border border-hooke-900">
                                                <Image src={newProduct.imagem} alt="Preview" fill className="object-cover" />
                                            </div>
                                            <button type="button" onClick={() => setNewProduct({ ...newProduct, imagem: "" })} className="text-xs font-bold text-red-500 uppercase tracking-widest hover:underline">
                                                Remover Foto
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="w-full relative shrink-0 flex items-center min-h-[48px] border border-hooke-900 bg-white">
                                            <UploadButton
                                                endpoint="imageUploader"
                                                onClientUploadComplete={(res) => {
                                                    if (res && res[0]) {
                                                        setNewProduct({ ...newProduct, imagem: res[0].url });
                                                    }
                                                }}
                                                onUploadError={(error: Error) => {
                                                    alert(`Erro ao fazer upload: ${error.message}`);
                                                }}
                                                appearance={{
                                                    button: "bg-hooke-900 text-white rounded-none uppercase text-xs font-bold tracking-widest px-4 py-2 hover:bg-black transition-colors w-full h-11 m-0",
                                                    allowedContent: "hidden"
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Descrição */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-hooke-900 block">Descrição</label>
                                <textarea
                                    value={newProduct.description}
                                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                                    rows={3}
                                    className="w-full border border-hooke-900 p-3 text-sm focus:outline-none focus:ring-1 focus:ring-hooke-900 transition-all rounded-none resize-none"
                                    placeholder="Detalhes sobre o tecido, modelagem..."
                                />
                            </div>

                            {/* Options */}
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    id="featuredCheckbox"
                                    checked={newProduct.featured}
                                    onChange={(e) => setNewProduct({ ...newProduct, featured: e.target.checked })}
                                    className="w-4 h-4 border-hooke-900 text-hooke-900 focus:ring-hooke-900 rounded-none accent-hooke-900"
                                />
                                <label htmlFor="featuredCheckbox" className="text-xs font-bold uppercase tracking-widest text-hooke-900 cursor-pointer">
                                    Destacar na Página Inicial?
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={isSavingNew}
                                className="w-full bg-hooke-900 text-white font-black uppercase tracking-widest py-4 text-sm hover:bg-black transition-colors disabled:opacity-70 rounded-none disabled:cursor-not-allowed mt-4"
                            >
                                {isSavingNew ? "CARREGANDO FOTO E SALVANDO..." : "CADASTRAR PRODUTO"}
                            </button>
                        </form>
                    </div>
                )}

                {/* Tabela de Produtos */}
                <h2 className="text-xl font-black uppercase tracking-tighter text-hooke-900 mb-6">Seus Produtos</h2>
                <div className="bg-white border border-hooke-900 overflow-hidden rounded-none">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-hooke-900 bg-gray-50">
                                <th className="p-4 text-xs font-bold uppercase tracking-widest text-hooke-900 hidden md:table-cell">ID</th>
                                <th className="p-4 text-xs font-bold uppercase tracking-widest text-hooke-900">Imagem</th>
                                <th className="p-4 text-xs font-bold uppercase tracking-widest text-hooke-900">Nome do Produto</th>
                                <th className="p-4 text-xs font-bold uppercase tracking-widest text-hooke-900">Preço (R$)</th>
                                <th className="p-4 text-xs font-bold uppercase tracking-widest text-hooke-900 text-right">Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id} className="border-b border-gray-200 last:border-0 hover:bg-gray-50 transition-colors">
                                    <td className="p-4 text-xs font-mono text-gray-500 truncate max-w-[120px] hidden md:table-cell" title={product.id}>{product.id}</td>
                                    <td className="p-4">
                                        {product.imagem ? (
                                            <div className="flex flex-col gap-2 items-start">
                                                <div className="relative w-12 h-12 border border-hooke-900">
                                                    <Image src={product.imagem} alt={product.name} fill className="object-cover" />
                                                </div>
                                                <button onClick={() => handleChange(product.id, "imagem", "")} className="text-[10px] text-red-500 font-bold uppercase tracking-widest text-left hover:underline">Remover</button>
                                            </div>
                                        ) : (
                                            <div className="w-28 relative h-10 border border-gray-300 pointer-events-auto flex items-center bg-white p-0">
                                                <UploadButton
                                                    endpoint="imageUploader"
                                                    onClientUploadComplete={(res) => {
                                                        if (res && res[0]) {
                                                            handleChange(product.id, "imagem", res[0].url);
                                                        }
                                                    }}
                                                    onUploadError={(error: Error) => {
                                                        alert(`Erro ao fazer upload: ${error.message}`);
                                                    }}
                                                    appearance={{
                                                        button: "bg-hooke-900 text-white rounded-none uppercase text-[10px] font-bold tracking-widest px-2 hover:bg-black transition-colors w-full h-10 m-0",
                                                        allowedContent: "hidden"
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </td>
                                    <td className="p-4">
                                        <input
                                            type="text"
                                            value={product.name}
                                            onChange={(e) => handleChange(product.id, "name", e.target.value)}
                                            className="w-full bg-white border border-gray-300 rounded-none px-3 py-2 text-sm focus:ring-1 focus:ring-hooke-900 focus:border-hooke-900 outline-none transition-all text-hooke-900"
                                        />
                                    </td>
                                    <td className="p-4">
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={product.price}
                                            onChange={(e) => handleChange(product.id, "price", parseFloat(e.target.value) || 0)}
                                            className="w-20 md:w-28 bg-white border border-gray-300 rounded-none px-2 md:px-3 py-2 text-sm focus:ring-1 focus:ring-hooke-900 focus:border-hooke-900 outline-none transition-all text-hooke-900"
                                        />
                                    </td>
                                    <td className="p-4 text-right">
                                        <button
                                            onClick={() => handleUpdate(product.id, product.name, product.price, product.imagem)}
                                            disabled={savingId === product.id}
                                            className="bg-hooke-900 hover:bg-black text-white px-3 md:px-5 py-2 rounded-none text-[10px] md:text-xs font-bold uppercase tracking-widest transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {savingId === product.id ? "Salvando" : "Salvar"}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {products.length === 0 && (
                        <div className="p-8 text-center text-xs font-bold uppercase tracking-widest text-gray-400">
                            Nenhum produto encontrado.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
