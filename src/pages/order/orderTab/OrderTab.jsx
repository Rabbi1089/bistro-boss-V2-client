import OrderItemCard from "../item card/OrderItemCard";


const OrderTab = ({items}) => {
    return (
            <div className="grid md:grid-cols-3 gap-2 my-4">
              {items?.map((item) => (
                <OrderItemCard key={item.id} item={item}></OrderItemCard>
              ))}
            </div>
    );
};

export default OrderTab;