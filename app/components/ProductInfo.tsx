import React from "react";

export const ProductInfo = ({ product }: { product: any }) => {
  return (
    <>
      <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
        Бүтээгдэхүүний мэдээлэл
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-zinc-400 dark:text-zinc-500">Брэнд</p>
          <p className="mt-0.5 text-sm font-medium text-zinc-900 dark:text-zinc-100">
            {product?.brand}
          </p>
        </div>
        <div>
          <p className="text-xs text-zinc-400 dark:text-zinc-500">Категори</p>
          <p className="mt-0.5 text-sm font-medium text-zinc-900 dark:text-zinc-100">
            {product?.category}
          </p>
        </div>
        <div>
          <p className="text-xs text-zinc-400 dark:text-zinc-500">Үлдэгдэл</p>
          <p className="mt-0.5 text-sm font-medium text-zinc-900 dark:text-zinc-100">
            {product?.availabilityStatus}
          </p>
        </div>
        <div>
          <p className="text-xs text-zinc-400 dark:text-zinc-500">Хүргэлт</p>
          <p className="mt-0.5 text-sm font-medium text-zinc-900 dark:text-zinc-100">
            {product?.shippingInformation}
          </p>
        </div>
        <div>
          <p className="text-xs text-zinc-400 dark:text-zinc-500">Баталгаа</p>
          <p className="mt-0.5 text-sm font-medium text-zinc-900 dark:text-zinc-100">
            {product?.warrantyInformation}
          </p>
        </div>
        <div>
          <p className="text-xs text-zinc-400 dark:text-zinc-500">Буцаалт</p>
          <p className="mt-0.5 text-sm font-medium text-zinc-900 dark:text-zinc-100">
            {product?.returnPolicy}
          </p>
        </div>
      </div>
    </>
  );
};
