import { useEffect, useContext, useState, useReducer, useRef } from "react";
import { Context } from "../../main";
import styles from "./Shop.module.css";
import { useClickOutside } from "../../Hooks/useClickOutside";
import { observer } from "mobx-react-lite";
import TimeModal from "../timeModal/TimeModal";
export const Shop = observer(({ setIsShop }) => {
  const { store } = useContext(Context);
  const [productList, setProductList] = useState([]);
  const [productName, setProductName] = useState("");
  const menuRef = useRef(null);
  useClickOutside(menuRef, () => {
    setIsShop((prev) => !prev);
    store.setPaymentError("");
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await store.getProducts();
        setProductList(response);
      } catch (error) {
        console.warn(error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className={styles.wrapper}>
      <div className={styles.modalContent} ref={menuRef}>
        <h2 className={styles.header}>Товары</h2>
        <p className={styles.myPoints}>Мои сабжы: {store.userPoints}</p>
        <input
          className={styles.input}
          type="text"
          placeholder="Название продукта"
          onChange={(e) => {
            setProductName(e.target.value);
          }}
        />
        {productList ? (
          <ul className={styles.list}>
            {productList
              .filter((product) =>
                product.name
                  .toLowerCase()
                  .includes(productName.toLocaleLowerCase())
              )
              .map((product) => (
                <li key={product.id} className={styles.eventName}>
                  <div className={styles.container}>
                    <span className={styles.eventName}>{product.name}</span>
                    <button
                      className={styles.button}
                      onClick={() => {
                        store.buyProduct(product.id, store.user.id);
                      }}
                    >
                      {product.price}
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        ) : (
          <p className={styles.eventName}>Нет товаров</p>
        )}

        {store.responseInfo && (
          <TimeModal message={store.responseInfo}></TimeModal>
        )}
      </div>
    </div>
  );
});
