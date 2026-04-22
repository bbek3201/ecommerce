"use client";
// TODO 1: React hook-уудыг импортлох (useState, useEffect)
import { useEffect } from "react";
// TODO 2: useParams импортлох

import { useState } from "react";
import { useParams } from "next/navigation";
import { ProductType } from "@/app/types";

import { HeaderId } from "@/app/components/HeaderId";

import { ProductMain } from "@/app/components/ProductMain";
import { ProductInfo } from "@/app/components/ProductInfo";
import { Footer } from "@/app/components/Footer";
import axios from "axios";
export default function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageIndex, setImageIndex] = useState<string>("");

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setImageIndex(res.data.images[0]);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Алдаа гарлаа");
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
        <ProductMain
          ProductInfo={ProductInfo}
          imageIndex={imageIndex}
          product={product}
          handleClick={HandleClick}
          discountedPrice={discountedPrice}
        />
      </main>
      <Footer />
    </div>
  );
}
