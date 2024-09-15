import React, { createContext, useContext, useReducer } from 'react';

// Contexts for state and dispatch
const CartStateContext = createContext();
const CartDispatchContext = createContext();

// Retrieve and parse cart data from localStorage
const getInitialCart = () => {
    const userId = localStorage.getItem('userId');
    const storedCart = localStorage.getItem(`cart-${userId}`);
    return storedCart ? JSON.parse(storedCart) : [];
};

const initialState = getInitialCart();

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_CART":
            return action.payload;
        case "ADD":
            return [...state, { id: action.id, name: action.name, stype: action.stype, quantity: action.quantity, price: action.price }];
        case "DELETE":
            return state.filter((_, index) => index !== action.index);
        case "UPDATE":
            return state
                .map((item, index) => {
                    if (index === action.index) {
                        if (action.quantity === 0) {
                            return null; // Mark for removal
                        }
                        return {
                            ...item,
                            quantity: action.quantity,
                            price: action.price
                        };
                    }
                    return item;
                })
                .filter(item => item !== null); // Remove any null items
        default:
            console.log("Error in Reducer");
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // Update localStorage whenever state changes
    React.useEffect(() => {
        const userId = localStorage.getItem('userId');
        localStorage.setItem(`cart-${userId}`, JSON.stringify(state));
    }, [state]);

    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
