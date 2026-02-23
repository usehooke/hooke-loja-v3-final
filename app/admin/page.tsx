"use client";

import { useEffect, useState } from "react";
import { db, auth } from "@/lib/firebase";
import { collection, getDocs, doc, updateDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image";
import Link from "next/link";

import { Trash2, Eye, EyeOff } from "lucide-react";
import { Toaster, toast } from "sonner";

interface AdminProduct {
    id: string;
    name: string;
    price: number;
    imagem?: string;
    isActive?: boolean;
    sizes?: string[];
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
        isActive: true,
        sizes: ["P", "M", "G", "GG"], // Default checkeds
    });

    const AVAILABLE_SIZES = ["P", "M", "G", "GG", "XG"];

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
                    isActive: data.isActive !== false, // se não existir, assume true
                    sizes: data.sizes || ["P", "M", "G", "GG"], // fallback
                });
            });
            setProducts(productsData);
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
        } finally {
            setLoading(false);
        }
    }

    const handleUpdate = async (id: string, newName: string, newPrice: number, newImagem?: string, newIsActive?: boolean, newSizes?: string[]) => {
        setSavingId(id);
        try {
            const productRef = doc(db, "produtos", id);
            await updateDoc(productRef, {
                name: newName,
                price: Number(newPrice),
                ...(newImagem && { imagem: newImagem }),
                isActive: newIsActive !== undefined ? newIsActive : true,
                sizes: newSizes || [],
            });
            toast.success(`Alterações salvas!`);
        } catch (error) {
            console.error("Erro ao atualizar produto:", error);
            toast.error("Erro ao atualizar produto.");
        } finally {
            setSavingId(null);
        }
    };

    const handleDelete = async (id: string, name: string) => {
        if (!window.confirm(`Tem certeza que deseja EXCLUIR DEFINITIVAMENTE o produto "${name}"? Essa ação não pode ser desfeita.`)) {
            return;
        }

        try {
            const productRef = doc(db, "produtos", id);
            // import { deleteDoc } from "firebase/firestore"; <-- vou garantir isso no top
            // Usando abordagem segura de exclusão real
            const { deleteDoc } = await import("firebase/firestore");
            await deleteDoc(productRef);
            toast.success(`Produto "${name}" excluído.`);
            fetchProducts();
        } catch (error) {
            console.error("Erro ao excluir:", error);
            toast.error("Erro ao excluir produto.");
        }
    };

    const toggleSize = (id: string, sizeToToggle: string, currentSizes: string[]) => {
        const newSizes = currentSizes.includes(sizeToToggle)
            ? currentSizes.filter(s => s !== sizeToToggle)
            : [...currentSizes, sizeToToggle];

        handleChange(id, "sizes", newSizes);
    };

    const toggleNewProductSize = (sizeToToggle: string) => {
        setNewProduct(prev => ({
            ...prev,
            sizes: prev.sizes.includes(sizeToToggle)
                ? prev.sizes.filter(s => s !== sizeToToggle)
                : [...prev.sizes, sizeToToggle]
        }));
    };

    const handleChange = (id: string, field: "name" | "price" | "imagem" | "isActive" | "sizes", value: string | number | boolean | string[]) => {
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
            toast.error("Preencha todos os campos obrigatórios e adicione uma imagem.");
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
                sizes: newProduct.sizes,         // Tamanhos controlados pelo usuário
                isActive: newProduct.isActive,   // Status na vitrine
                category: newProduct.category,
                details: { // Informações Padrão / Mockadas para facilitar
                    fabric: "Algodão Premium",
                    model: "Regular",
                    wash: "Amaciada"
                }
            };

            // 4. Salvar no Firestore
            await setDoc(doc(db, "produtos", id), finalProduct);
            toast.success("Produto cadastrado com sucesso!");

            // 5. Reset do Formulário e Fetch Reativo
            setShowForm(false);
            setNewProduct({ name: "", category: "Oversized", price: 0, description: "", featured: false, imagem: "", isActive: true, sizes: ["P", "M", "G", "GG"] });
            fetchProducts();

        } catch (err) {
            console.error("Erro ao salvar o novo produto:", err);
            toast.error("Erro ao cadastrar novo produto. Veja o console.");
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
            <Toaster position="top-right" richColors />
            <div className="max-w-6xl mx-auto">

                {/* Cabeçalho */}
                <div className="flex items-center justify-between mb-10 border-b border-hooke-900 pb-6">
                    <div>
                        <h1 className="text-3xl font-black uppercase tracking-tighter text-hooke-900">Painel Admin</h1>
                        <p className="text-xs uppercase tracking-widest text-gray-400 mt-2">Logado como: {user.email}</p>
                    </div>
                    <div className="flex items-center gap-4 flex-wrap">
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(`${window.location.origin}/api/feed.xml`);
                                toast.success("URL do Catálogo Copiada! Cole no Gerenciador do Meta.");
                            }}
                            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-pink-600 bg-pink-50 border border-pink-200 px-6 py-3 hover:bg-pink-100 hover:text-pink-700 rounded-none transition-colors"
                            title="Copiar Link XML para Instagram Shopping"
                        >
                            Catálogo Instagram
                        </button>

                        <button
                            onClick={() => setShowForm(!showForm)}
                            className="text-xs font-bold uppercase tracking-widest text-white bg-hooke-900 border border-hooke-900 px-6 py-3 hover:bg-black rounded-none transition-colors"
                        >
                            {showForm ? "CANCELAR" : "+ NOVO PRODUTO"}
                        </button>
                        <Link
                            href="/admin/pedidos"
                            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-hooke-900 bg-gray-100 border border-transparent px-6 py-3 hover:bg-gray-200 rounded-none transition-colors"
                        >
                            Ver Pedidos
                        </Link>
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

                            {/* Tamanhos Disponíveis */}
                            <div className="space-y-2 border-t border-gray-200 pt-4">
                                <label className="text-xs font-bold uppercase tracking-widest text-hooke-900 block mb-3">Tamanhos Disponíveis</label>
                                <div className="flex flex-wrap gap-2">
                                    {AVAILABLE_SIZES.map(size => {
                                        const isSelected = newProduct.sizes.includes(size);
                                        return (
                                            <button
                                                key={size}
                                                type="button"
                                                onClick={() => toggleNewProductSize(size)}
                                                className={`w-10 h-10 flex items-center justify-center font-bold text-sm transition-all border-2
                                                ${isSelected ? 'bg-hooke-900 text-white border-hooke-900' : 'bg-transparent text-gray-400 border-gray-200 hover:border-gray-400'}
                                              `}
                                            >
                                                {size}
                                            </button>
                                        );
                                    })}
                                </div>
                                <p className="text-[10px] text-gray-400 uppercase mt-2">Dica: Desmarque os tamanhos que estão esgotados neste produto.</p>
                            </div>

                            {/* Options */}
                            <div className="flex items-center gap-6 border-t border-gray-200 pt-4">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="featuredCheckbox"
                                        checked={newProduct.featured}
                                        onChange={(e) => setNewProduct({ ...newProduct, featured: e.target.checked })}
                                        className="w-4 h-4 border-hooke-900 text-hooke-900 focus:ring-hooke-900 rounded-none accent-hooke-900"
                                    />
                                    <label htmlFor="featuredCheckbox" className="text-xs font-bold uppercase tracking-widest text-hooke-900 cursor-pointer">
                                        Destacar na Home
                                    </label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="activeCheckbox"
                                        checked={newProduct.isActive}
                                        onChange={(e) => setNewProduct({ ...newProduct, isActive: e.target.checked })}
                                        className="w-4 h-4 border-hooke-900 text-hooke-900 focus:ring-hooke-900 rounded-none accent-hooke-900"
                                    />
                                    <label htmlFor="activeCheckbox" className="text-xs font-bold uppercase tracking-widest text-hooke-900 cursor-pointer">
                                        Ativo na Loja (Visível)
                                    </label>
                                </div>
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
                                <th className="p-4 text-xs font-bold uppercase tracking-widest text-hooke-900">Visível</th>
                                <th className="p-4 text-xs font-bold uppercase tracking-widest text-hooke-900">Imagem</th>
                                <th className="p-4 text-xs font-bold uppercase tracking-widest text-hooke-900 w-[20%]">Nome do Produto</th>
                                <th className="p-4 text-xs font-bold uppercase tracking-widest text-hooke-900">Preço (R$)</th>
                                <th className="p-4 text-xs font-bold uppercase tracking-widest text-hooke-900 min-w-[200px]">Estoque (Tamanhos)</th>
                                <th className="p-4 text-xs font-bold uppercase tracking-widest text-hooke-900 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id} className={`border-b border-gray-200 last:border-0 hover:bg-gray-50 transition-colors ${!product.isActive ? 'opacity-50 grayscale' : ''}`}>
                                    <td className="p-4 text-xs font-mono text-gray-500 truncate max-w-[100px] hidden md:table-cell" title={product.id}>{product.id}</td>

                                    {/* Toggle Visibility */}
                                    <td className="p-4 text-center">
                                        <button
                                            onClick={() => handleChange(product.id, "isActive", !product.isActive)}
                                            className="text-hooke-900 hover:scale-110 transition-transform flex justify-center w-full"
                                            title={product.isActive ? "Visível na vitrine" : "Oculto na vitrine"}
                                        >
                                            {product.isActive ? <Eye size={20} /> : <EyeOff size={20} className="text-gray-400" />}
                                        </button>
                                    </td>
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
                                        <div className="flex gap-1 flex-wrap">
                                            {AVAILABLE_SIZES.map(size => {
                                                const isStocked = (product.sizes || []).includes(size);
                                                return (
                                                    <button
                                                        key={size}
                                                        onClick={() => toggleSize(product.id, size, product.sizes || [])}
                                                        className={`w-7 h-7 text-[10px] font-bold border flex items-center justify-center transition-colors
                                                            ${isStocked ? 'bg-hooke-900 text-white border-hooke-900' : 'bg-transparent text-gray-300 border-gray-200'}    
                                                        `}
                                                    >
                                                        {size}
                                                    </button>
                                                )
                                            })}
                                        </div>
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex justify-end gap-2 items-center">
                                            <button
                                                onClick={() => handleUpdate(product.id, product.name, product.price, product.imagem, product.isActive, product.sizes)}
                                                disabled={savingId === product.id}
                                                className="bg-hooke-900 hover:bg-black text-white px-4 py-2 rounded-none text-[10px] font-bold uppercase tracking-widest transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {savingId === product.id ? "Salvando" : "Salvar"}
                                            </button>

                                            <button
                                                onClick={() => handleDelete(product.id, product.name)}
                                                className="text-red-300 hover:text-red-600 transition-colors p-2"
                                                title="Excluir Produto"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
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
