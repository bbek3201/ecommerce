import React from "react";

interface ProductMainProps {
  imageIndex: string;
  product: any;
  handleClick: (image: string) => void;
  ProductInfo: React.FC<{ product: any }>;
  discountedPrice: string;
  Comments: React.FC<{ product: any }>;
}

export const ProductMain = ({
  imageIndex,
  product,
  handleClick,
  ProductInfo,
  discountedPrice,
  Comments,
}: ProductMainProps) => {
  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
      <div>
        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
          <img
            src={imageIndex}
            alt={product?.title}
            className="h-96 w-full object-cover"
          />
        </div>

        <div className="mt-4 grid grid-cols-4 gap-3">
          {product?.images.map((image: string) => (
            <button
              onClick={() => handleClick(image)}
              key={image}
              className="overflow-hidden rounded-xl border-2 border-zinc-900 dark:border-zinc-100 cursor-pointer"
            >
              <img
                src={image}
                alt="thumbnail"
                className="h-20 w-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      <div>
        <span className="inline-block rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
          {product?.category}
        </span>

        <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          {product?.title}
        </h2>

        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          {product?.brand}
        </p>

        <div className="mt-4 flex items-center gap-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className={`h-5 w-5 ${Math.round(product?.rating) >= star ? "text-amber-400" : "text-zinc-200 dark:text-zinc-700"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            {product?.rating}
          </span>
        </div>

        <div className="mt-6 flex items-baseline gap-3">
          <span className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            ${discountedPrice}
          </span>
          <span className="text-lg text-zinc-400 line-through">
            ${product?.price}
          </span>
          <span className="rounded-full bg-red-50 px-2.5 py-0.5 text-sm font-medium text-red-600 dark:bg-red-900/30 dark:text-red-400">
            -{product?.discountPercentage}%
          </span>
        </div>

        <p className="mt-6 leading-relaxed text-zinc-600 dark:text-zinc-400">
          {product?.description}
        </p>

        <div className="mt-8 space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <ProductInfo product={product} />
        </div>

        <div className="mt-6 flex items-center gap-2">
          <span
            className={`h-2.5 w-2.5 rounded-full ${product?.stock > 50 ? "bg-emerald-500" : product?.stock > 10 ? "bg-amber-500" : "bg-red-500"}`}
          ></span>
          <span className="text-sm font-medium">
            Үлдэгдэл {product?.stock} ширхэг
          </span>
        </div>

        <div className="mt-8">
          <Comments product={product} />
        </div>
      </div>
    </div>
  );
};
