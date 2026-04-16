"use client";
// TODO 1: React hook-уудыг импортлох (useState, useEffect)
import { useEffect } from "react";
// TODO 2: useParams импортлох

import { useState } from "react";
import { useParams } from "next/navigation";
import { ProductType } from "@/app/types";
import { Footer } from "@/app/components/Footer";
import { HeaderId } from "@/app/components/HeaderId";
import { ProductInfo } from "@/app/components/ProductInfo";
import { Comments } from "@/app/components/Comments";
import { ProductMain } from "@/app/components/ProductMain";

export default function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ProductType | null>(null);
  const [imageIndex, setImageIndex] = useState<string>("");

  useEffect(() => {
    let responseStatus = 200;
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setImageIndex(data.images[0]);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }
  if (!product) return null;

  const discountedPrice = (
    product.price -
    (product.price * product.discountPercentage) / 100
  ).toFixed(2);

  const HandleClick = (image: string) => {
    setImageIndex(image);
  };
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <HeaderId />

      <main className="mx-auto max-w-7xl px-6 py-10">
        {ProductMain(
          imageIndex,
          product,
          HandleClick,
          ProductInfo,
          Footer,
          discountedPrice,
          Comments,
        )}
      </main>
      <Footer />
    </div>
  );
}
