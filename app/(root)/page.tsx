

import { findPizza } from "@/shared/lib";
import { GetSearchParams } from "@/shared/lib/find-pizza";
import { Suspense } from "react";

import {
  Container,
  Title,
  TopBar,
  Filters,
  ProductsGroupList,
} from "@/shared/component/shared";

export default async function Home({searchParams}: { searchParams: GetSearchParams}) {
 const categories = await findPizza(searchParams)

  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>
      <TopBar
        categories={categories.filter(
          (category) => category.products.length > 0
        )}
      />
      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">
          {/* фильтрация */}
          <div className="w-[250px]">
            <Suspense>
              <Filters />
            </Suspense>
          </div>
          {/* список товаров */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {categories.map(
                (category) =>
                  category.products.length > 0 && (
                    <ProductsGroupList
                      categoryId={category.id}
                      key={category.id}
                      title={category.name}
                      items={category.products}
                    />
                  )
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
