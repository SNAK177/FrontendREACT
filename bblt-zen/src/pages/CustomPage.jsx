import React, { useState } from "react";
import { useCart } from "../hooks/useCart";
import { customOptions } from "../data/customOptions";
import '../styles/CustomPage.css';

export const CustomPage = () => {
  const { addToCart } = useCart();
  const [selections, setSelections] = useState({
    id : String | Number,
    name : String,
    base: "Tè nero con latte",
    bubble: "Tapioca classica",
    aroma: "Vaniglia",
    sweetness: 50,
    ice: false,
    size: "L",
    quantity: 1,
    price : Number
  });

  const { bases, bubbles, aromas } = customOptions;
  const getPrice = () => (selections.size === "M" ? 4.5 : 5.5);

  const handleAddToCart = () => {
    addToCart({
      id: `custom-${Date.now()}`,
      name: "Bubble Tea Personalizzato",
      price: getPrice(),
      quantity: selections.quantity,
      options: selections,
    });
    alert("Bevanda personalizzata aggiunta al carrello!");
  };

  return (
    <div className="custom-container">
      <h1 className="custom-title">Crea il tuo Bubble Tea</h1>

      <div className="custom-form">
        <div className="price-info">
          <p className="price-text">Prezzo M: €4.50</p>
          <p className="price-text">Prezzo L: €5.50</p>
        </div>

        <div className="options-container">
          <div className="option-section">
            <h3 className="option-title">Base</h3>
            <div className="options-grid">
              {bases.map((base) => (
                <button
                  key={base}
                  onClick={() => setSelections({ ...selections, base })}
                  className={`option-button ${
                    selections.base === base ? "selected" : ""
                  }`}
                >
                  {base}
                </button>
              ))}
            </div>
          </div>

          <div className="option-section">
            <h3 className="option-title">Bubble</h3>
            <div className="options-grid">
              {bubbles.map((bubble) => (
                <button
                  key={bubble}
                  onClick={() => setSelections({ ...selections, bubble })}
                  className={`option-button ${
                    selections.bubble === bubble ? "selected" : ""
                  }`}
                >
                  {bubble}
                </button>
              ))}
            </div>
          </div>

          <div className="option-section">
            <h3 className="option-title">Aroma</h3>
            <div className="options-grid">
              {aromas.map((aroma) => (
                <button
                  key={aroma}
                  onClick={() => setSelections({ ...selections, aroma })}
                  className={`option-button ${
                    selections.aroma === aroma ? "selected" : ""
                  }`}
                >
                  {aroma}
                </button>
              ))}
            </div>
          </div>

          <div className="option-section">
            <h3 className="option-title">Dolcezza: {selections.sweetness}%</h3>
            <input
              type="range"
              min="0"
              max="100"
              step="10"
              value={selections.sweetness}
              onChange={(e) =>
                setSelections({
                  ...selections,
                  sweetness: parseInt(e.target.value),
                })
              }
              className="sweetness-slider"
            />
          </div>

          <div className="size-container">
            <label className="size-label">
              <input
                type="radio"
                name="size"
                value="M"
                checked={selections.size === "M"}
                onChange={(e) =>
                  setSelections({ ...selections, size: e.target.value })
                }
              />
              <span>Medio (M)</span>
            </label>
            <label className="size-label">
              <input
                type="radio"
                name="size"
                value="L"
                checked={selections.size === "L"}
                onChange={(e) =>
                  setSelections({ ...selections, size: e.target.value })
                }
              />
              <span>Large (L)</span>
            </label>
          </div>

          <div className="option-section">
            <h3 className="option-title">Quantità</h3>
            <input
              type="number"
              min="1"
              value={selections.quantity}
              onChange={(e) =>
                setSelections({
                  ...selections,
                  quantity: parseInt(e.target.value) || 1,
                })
              }
              className="quantity-input"
            />
          </div>

          <button onClick={handleAddToCart} className="add-to-cart-button">
            Aggiungi al Carrello - €
            {(getPrice() * selections.quantity).toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
};
