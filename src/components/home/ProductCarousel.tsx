import { FC } from "react";
import { graphqlRequest } from "../../lib/graphql-fetch";
import { GET_PRODUCTS } from "@/graphql/catelog/queries/Product";
import { ThreeItemGrid } from "./ThreeItemGrid";
import Theme from "./ProductCarouselTheme";

interface ProductCarouselProps {
  options: {
    title?: string;
    filters?: Record<string, any>;
  };
  itemCount?: number;
}

const ProductCarousel: FC<ProductCarouselProps> = async ({
  options,
  itemCount = 4,
}) => {
  const { filters = {}, title } = options;

  try {
    const variables: any = {
      first: filters.limit ? parseInt(filters.limit, 10) : itemCount,
      sortKey: "CREATED_AT",
      reverse: true,
    };

    if (filters.sort) {
      const [key, direction] = filters.sort.split("-");
      const keyMap: Record<string, string> = {
        created_at: "CREATED_AT",
        price: "PRICE",
        name: "NAME",
      };

      variables.sortKey = keyMap[key?.toLowerCase()] || "CREATED_AT";
      variables.reverse = direction === "desc";
    }

    const filterObject: Record<string, any> = {};

    if (filters.new === "1" || filters.new === 1) {
      filterObject.new = "1";
    }

    if (filters.featured === "1" || filters.featured === 1) {
      filterObject.featured = "1";
    }

    if (Object.keys(filterObject).length) {
      variables.filter = JSON.stringify(filterObject);
    }

    const data = await graphqlRequest<any>(
      GET_PRODUCTS,
      variables,
      {
        tags: ["products"],
        life: "days",
      }
    );

    const products =
      data?.products?.edges?.slice(0, 8).map((e: any) => e.node) || [];

    if (!products.length) return null;

    if (itemCount === 3) {
      return (
        <ThreeItemGrid
          title={title || "Products"}
          description="Discover the latest trends! Fresh products just added—shop new styles, tech, and essentials before they're gone."
          products={products}
        />
      );
    }

    return (
      <Theme
        title={title || "Products"}
        description="Discover the latest trends! Fresh products just added—shop new styles, tech, and essentials before they're gone."
        products={products}
      />
    );
  } catch (error) {
    console.error("Error fetching products for carousel:", {
      title,
      filters,
      error,
    });
    return null;
  }
};

export default ProductCarousel;
