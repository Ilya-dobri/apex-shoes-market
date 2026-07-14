// import { collection, getDocs } from "firebase/firestore";

// import Catalog from "@/components/Catalog";
// import { db } from "@/dataBase/firebaseConfig";
// import { cache } from "react";

// interface Props {
//   params: Promise<{ slug: string[] }>;
// }

// interface Shoe {
//   id: string;
//   categoryId?: number;
//   name?: string;
//   collection?: string;
//   section?: string | string[];
//   type?: string;
//   brand?: string;
//   soon?: string;
//   technology?: string | null;
//   [key: string]: any;
// }

// /** Приводит section к массиву в любом случае */
// function toSections(section?: string | string[]): string[] {
//   if (Array.isArray(section)) return section;
//   if (section) return [section];
//   return [];
// }

// export const getAllShoes = cache(async (): Promise<Shoe[]> => {
//   const snapshot = await getDocs(collection(db, "shoes"));
//   const shoes = snapshot.docs.map((doc) => ({
//     id: doc.id,
//     ...(doc.data() as any),
//   }));

//   if (shoes.length === 0) {
//     throw new Error("getAllShoes() returned 0 documents at build time");
//   }

//   return shoes;
// });

// function buildProductPaths(shoes: Shoe[]): Set<string> {
//   const paths = new Set<string>();

//   shoes.forEach((p) => {
//     const sections = toSections(p.section);

//     if (p.collection) {
//       paths.add(`/${p.collection}`);

//       sections.forEach((section) => {
//         paths.add(`/${p.collection}/${section}`);

//         if (p.type) {
//           paths.add(`/${p.collection}/${section}/${p.type}`);
//         }
//       });
//     }

//     if (p.brand) {
//       paths.add(`/brands/${p.brand}`);
//     }

//     if (p.technology) {
//       paths.add(`/technology/${p.technology}`);
//     }
//   });

//   return paths;
// }

// export async function generateStaticParams() {
//   const shoes = await getAllShoes();
//   const paths = buildProductPaths(shoes);

//   const result = [...paths].map((path) => ({
//     slug: path.slice(1).split("/"),
//   }));

//   // временный лог — посмотрите вывод при билде
//   console.log(
//     `[generateStaticParams] shoes: ${shoes.length}, paths generated:`,
//     [...paths]
//   );

//   return result;
// }

// export default async function Page({ params }: Props) {
//   const { slug } = await params;
//   const href = "/" + slug.join("/");

//   const shoes = await getAllShoes();

//   const products = shoes.filter((item) => {
//     const sections = toSections(item.section);

//     const matchesSection = sections.some(
//       (section) =>
//         href === `/${item.collection}/${section}` ||
//         href === `/${item.collection}/${section}/${item.type}`
//     );

//     return (
//       href === `/${item.collection}` ||
//       matchesSection ||
//       href === `/brands/${item.brand}` ||
//       href === `/technology/${item.technology}`
//     );
//   });

//   // не используем notFound() — при output: 'export' страница должна
//   // существовать статически для всех сгенерированных путей,
//   // а пустой каталог Catalog может отрисовать сам ("товаров нет")
//   return <Catalog product={products} />;
// }