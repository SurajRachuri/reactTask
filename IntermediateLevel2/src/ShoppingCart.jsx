import { useState, useEffect } from "react";
// import "./ShoppingCart.css";

function ShoppingCart() {
  const [products] = useState([
    { id: 1, name: "Product 1", price: 29.99 },
    { id: 2, name: "Product 2", price: 49.99 },
    { id: 3, name: "Product 3", price: 19.99 },
  ]);

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add to cart
  const addToCart = (product) => {
    setCart((prev) => {
      const itemExists = prev.find((item) => item.id === product.id);

      if (itemExists) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Update quantity
  const updateQuantity = (productId, delta) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove item
  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  // Total price
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h2>Products</h2>

      <div className="products">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <p>{product.name}</p>
            <p>₹{product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>

      <h2>Cart</h2>

      {cart.length === 0 && <p className="empty">Cart is empty</p>}

      <div className="cart-items">
        {cart.map((item) => (
          <div className="cart-item" key={item.id}>
            <span>
              {item.name} (₹{item.price})
            </span>

            <div className="quantity">
              <button onClick={() => updateQuantity(item.id, -1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, 1)}>+</button>
            </div>

            <button
              className="remove"
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <h3 className="total">Total: ₹{total.toFixed(2)}</h3>
    </div>
  );
}

export default ShoppingCart;
