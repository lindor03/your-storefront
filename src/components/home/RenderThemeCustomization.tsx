import { FC } from "react";
import ImageCarousel from "./ImageCarousel";
import ProductCarousel from "./ProductCarousel";
import CategoryCarousel from "./CategoryCarousel";

interface ThemeCustomizationItem {
  id: string;
  type: string;
  name: string;
  status: boolean;
  translations: {
    id: string;
    options: {
      title?: string | null;
      css?: string | null;
      html?: string | null;
      filters?: {
        limit?: string;
      };
    };
  }[];
}

interface RenderThemeCustomizationProps {
  themeCustomizations: ThemeCustomizationItem[];
}

const RenderThemeCustomization: FC<RenderThemeCustomizationProps> = ({
  themeCustomizations,
}) => {
  if (!Array.isArray(themeCustomizations) || themeCustomizations.length === 0) {
    return null;
  }

  let productCarouselIndex = 0;

  return (
    <section className="mx-auto flex w-full max-w-screen-2xl flex-col gap-y-10 px-[15px] pb-4 md:gap-y-20 xss:px-7.5">
      {themeCustomizations.map((item) => {
        if (!item.status) return null;

        const translation = item.translations?.[0];
        if (!translation) return null;

        const options = translation.options ?? {};

        switch (item.type) {
          case "image_carousel":
            return (
              <ImageCarousel
                key={item.id}
                options={options}
              />
            );

          case "product_carousel": {
            productCarouselIndex++;

            const limit = options.filters?.limit
              ? parseInt(options.filters.limit, 10)
              : undefined;

            const itemCount =
              limit ?? (productCarouselIndex === 1 ? 3 : 4);

            return (
              <ProductCarousel
                key={item.id}
                options={{ ...options, title: item.name }}
                itemCount={itemCount}
              />
            );
          }

          case "category_carousel":
            return (
              <CategoryCarousel
                key={item.id}
                options={options}
              />
            );

          default:
            return null;
        }
      })}
    </section>
  );
};

export default RenderThemeCustomization;
