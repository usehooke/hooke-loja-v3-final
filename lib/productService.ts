import { db } from "@/lib/firebase";
import { collection, getDocs, query, where, limit, QueryConstraint } from "firebase/firestore";
import type { Product } from "@/data/catalogo";

export const COLLECTION_NAME = "produtos";

export async function getProducts(category?: string): Promise<Product[]> {
    try {
        const productsRef = collection(db, COLLECTION_NAME);
        const conditions: QueryConstraint[] = [];
        // Filtra por ativos (ou que não tenham a flag, para retrocompatibilidade local)
        conditions.push(where("isActive", "!=", false));

        if (category) {
            conditions.push(where("category", "==", category));
        }

        const q = query(productsRef, ...conditions);

        const snapshot = await getDocs(q);
        const products: Product[] = [];
        snapshot.forEach((doc) => {
            products.push({ id: doc.id, ...doc.data() } as Product);
        });

        return products;
    } catch (error) {
        console.error("Erro ao buscar getProducts:", error);
        return [];
    }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
    try {
        const productsRef = collection(db, COLLECTION_NAME);
        // Primeiro tenta encontrar onde slug == param
        const q = query(productsRef, where("slug", "==", slug), limit(1));
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
            return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as Product;
        }

        // Fallback: se o slug for na verdade o ID (como no Admin novo)
        const qFallback = query(productsRef, where("id", "==", slug), limit(1));
        const snapshotFb = await getDocs(qFallback);

        if (!snapshotFb.empty) {
            return { id: snapshotFb.docs[0].id, ...snapshotFb.docs[0].data() } as Product;
        }

        return null;
    } catch (error) {
        console.error("Erro ao buscar getProductBySlug:", error);
        return null;
    }
}

export async function getFeaturedProducts(limitCount: number = 8): Promise<Product[]> {
    try {
        const productsRef = collection(db, COLLECTION_NAME);
        const q = query(productsRef, where("featured", "==", true), where("isActive", "!=", false));
        // O Firebase exige índice composto para isso com limite, então pra simplificar a query principal sem criar indíces novos agora:
        // Podes carregar os featured locais e filtrar no cliente se necessário, mas para este demo focaremos no básico.
        // const q = query(productsRef, where("featured", "==", true), limit(limitCount)); // old

        let snapshot;
        try {
            snapshot = await getDocs(q);
        } catch {
            // Fallback se faltar index no firebase localmente
            const dumpQ = query(productsRef, where("featured", "==", true));
            snapshot = await getDocs(dumpQ);
        }

        const products: Product[] = [];
        snapshot.forEach((doc) => {
            products.push({ id: doc.id, ...doc.data() } as Product);
        });

        // Se o banco não retornou features suficientes, traz mais produtos
        if (products.length < limitCount) {
            const fallbackQ = query(productsRef, limit(limitCount));
            const fallbackSnap = await getDocs(fallbackQ);

            fallbackSnap.forEach((doc) => {
                if (!products.some(p => p.id === doc.id)) {
                    products.push({ id: doc.id, ...doc.data() } as Product);
                }
            });
        }

        // Filtrando falsos localmente para garantir
        const finalActiveProducts = products.filter(p => p.isActive !== false);

        return finalActiveProducts.slice(0, limitCount);
    } catch (error) {
        console.error("Erro ao buscar getFeaturedProducts:", error);
        return [];
    }
}
