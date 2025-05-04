import { OrderItemInterface } from "@/lib/api/types";


export const OrderItemCard = ({ item }: { item: OrderItemInterface }) => {
    return (
        <div className="p-5 rounded-md bg-[#27272A] my-3">
            <div className="flex flex-row justify-between items-center">
                <div className="w-1/5">
                    <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-20 rounded-md"
                    />
                </div>
                <div className="flex flex-col gap-2 w-2/5">
                    <span className="text-xs leading-4 font-normal text-[#A1A1AA] text-capitalize">
                        {item.product.tags.map((tag) => tag.name).join(", ")}
                    </span>
                    <span className="text-sm leading-5 font-medium text-white">
                        {item.product.name}
                    </span>
                    <span className="text-sm leading-5 font-medium text-white">
                        {item.product.price}
                    </span>
                </div>
                <div className="flex flex-row gap-2 w-1/5">
                    <div className="text-sm leading-5 font-medium text-white">
                        {item.quantity} * {item.product.sale_price}
                    </div>
                    <span className="text-sm leading-5 font-medium text-white">
                        |
                    </span>
                </div>
                <span className="text-sm leading-5 font-medium text-white w-1/5">
                    {item.product.sale_price * item.quantity} {"(Ks)"}
                </span>
            </div>
        </div>
    );
};