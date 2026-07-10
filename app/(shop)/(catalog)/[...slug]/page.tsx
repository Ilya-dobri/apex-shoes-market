import { collection, getDocs } from "firebase/firestore";
import { notFound } from "next/navigation";

import Catalog from "@/components/Catalog";
import { db } from "@/dataBase/firebaseConfig";

interface Props {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateStaticParams() {
  const snapshot = await getDocs(collection(db, "shoes"));

  const paths = new Set<string>();

  snapshot.docs.forEach((doc) => {  
    const p: any = doc.data();

    paths.add(`/${p.collection}`);
    paths.add(`/${p.collection}/${p.section}`);
    paths.add(`/${p.collection}/${p.section}/${p.type}`);

    paths.add(`/brands/${p.brand}`);

    if (p.technology) {
      paths.add(`/technology/${p.technology}`);
    }
  });

  return [...paths].map((path) => ({
    slug: path.slice(1).split("/"),
  }));
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  const snapshot = await getDocs(collection(db, "shoes"));

  const products = snapshot.docs
    .map((doc) => ({
      id: doc.id,
      ...(doc.data() as any),
    }))
    .filter((item: any) => {
      const href = "/" + slug.join("/");

      return (
        href === `/${item.collection}` ||
        href === `/${item.collection}/${item.section}` ||
        href === `/${item.collection}/${item.section}/${item.type}` ||
        href === `/brands/${item.brand}` ||
        href === `/technology/${item.technology}`
        
      );
    });

  if (!products.length) {
    notFound();
  }

  return <Catalog product={products} />;
}