import AddToBag from "@/app/components/AddToBag";
import CheckoutNow from "@/app/components/CheckoutNow";
import ImageGallery from "@/app/components/ImageGallery";
import { fullProduct } from "@/app/interface";
import { client } from "@/app/lib/sanity";
import { Button } from "@/components/ui/button";
import { Star, Truck } from "lucide-react";

async function getData(slug: string) {
  const query = `*[_type == "product" && slug.current == "${slug}"][0] {
    _id,
    images,
    price,
    name,
    description,
    "slug": slug.current,
    "categoryName": category->name,
    price_id
  }`;

  const data = await client.fetch(query);

  return data;
}

export const dynamic = "force-dynamic";

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const data: fullProduct = await getData(params.slug);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <ImageGallery images={data.images} />

          <div className="md:py-8">
            <div className="mb-2 md:mb-3">
              <span className="mb-0.5 inline-block text-gray-500">
                {data.categoryName}
              </span>
              <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">
                {data.name}
              </h2>
            </div>

            <div className="mb-6 flex items-center gap-3 md:mb-10">
              <Button className="rounded-full gap-x-2">
                <span className="text-sm">4.2</span>
                <Star className="h-5 w-5" />
              </Button>

              <span className="text-sm text-gray-500 transition duration-100">
                56 Ratings
              </span>
            </div>

            <div className="mb-4">
              <div className="flex items-end gap-2">
                <span className="text-xl font-bold text-gray-800 md:text-2xl">
                  ${data.price}
                </span>
                <span className="mb-0.5 text-red-500 line-through">
                  ${data.price + 30}
                </span>
              </div>

              <span className="text-sm text-gray-500">
                Incl. Vat plus shipping
              </span>
            </div>

            <div className="mb-6 flex items-center gap-2 text-gray-500">
              <Truck className="w-6 h-6" />
              <span className="text-sm">2-4 Day Shipping</span>
            </div>

            <div className="flex gap-2.5">
              <AddToBag
                currency="USD"
                description={data.description}
                image={data.images[0]}
                name={data.name}
                price={data.price}
                key={data._id}
                price_id={data.price_id}
              />
              <CheckoutNow
                currency="USD"
                description={data.description}
                image={data.images[0]}
                name={data.name}
                price={data.price}
                key={data._id}
                price_id={data.price_id}
              />
            </div>

            <p className="mt-12 text-base text-gray-500 tracking-wide">
              {data.slug === "nike-windrunner" && (
                <>
                  Embrace sporty sophistication with the Nike Windrunner, an enduring icon of athletic style. Featuring a lightweight yet durable design, its signature chevron at the chest adds a touch of retro flair. The adjustable hood and water-resistant fabric make it perfect for unpredictable weather, while the classic color-blocking ensures a timeless look. Elevate your streetwear with the versatile and timeless appeal of the Nike Windrunner.
                </>
              )}

              {data.slug === "nike-air-vapormax-2023-fllyknit" && (
                <>
                  Experience the future of comfort and style with the Nike Air VaporMax 2023 Flyknit. Boasting a cutting-edge Flyknit upper for a lightweight, sock-like fit, these sneakers redefine modern aesthetics. The revolutionary VaporMax cushioning technology underfoot ensures responsive energy return, making each step a sensation. Elevate your sneaker game with the fusion of innovation and sleek design in the Nike Air VaporMax 2023 Flyknit.
                </>
              )}

              {data.slug === "nike-sportswear-phoenix-fleece" && (
                <>
                  Elevate your style with our Light Mint Bliss Set! This effortlessly chic ensemble features a trendy mint shirt paired with matching tights, delivering the perfect blend of comfort and sophistication. Ideal for any occasion, this outfit radiates freshness and modern charm. Grab yours now and embrace the minty-fresh vibe for just $40. Elevate your look, embrace the trend!
                </>
              )}

              {data.slug === "nike-air-force-1-07" && (
                <>
                  Step into classic street style with the Nike Air Force 1 &apos;07. Crafted with a premium leather upper for durability, its timeless design is complemented by iconic swoosh branding. The legendary Air-Sole unit ensures unmatched comfort with every step, making these sneakers a must-have for those who appreciate heritage fused with contemporary flair. Elevate your look effortlessly with the Nike Air Force 1 &apos;07.
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
