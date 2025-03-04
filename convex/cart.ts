import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const addToCart = mutation({
    args: {
        productId: v.number(),
        name: v.string(),
        price: v.number(),
        // quantity: v.number(),
    },
    handler: async (ctx, {productId, name, price}) => {
        const existingItem = await ctx.db
        .query("cart")
        .withIndex("by_productId", (q) => q.eq("productId", productId))
        .first();

        if (existingItem) {
            await ctx.db.patch(existingItem._id, {quantity: existingItem.quantity + 1});
        } else {
            await ctx.db.insert("cart", {productId, name, price, quantity: 1});
        }
    },
});

export const getCart = query ({
    args: {},
    handler: async (ctx) => {
        return await ctx.db
            .query("cart")
            .collect();
    }
})

export const removeFromCart = mutation({
    args: {
        productId: v.number(),
    },
    handler: async (ctx, {productId}) => {
        const item = await ctx.db
            .query("cart")
            .withIndex("by_productId", (q) => q.eq("productId", productId))
            .first();
        
        if (item) {
            await ctx.db.delete(item._id);
        }
    }   
})

export const checkout = mutation({
    args: {},
    handler: async (ctx) => {
        const cartItems = await ctx.db
            .query("cart")
            .collect();
        for (const item of cartItems) {
            await ctx.db.delete(item._id);
        }
    }
})

export const increment = mutation({
    args: {
        productId: v.number(),
    },
    handler: async (ctx, {productId}) => {
        const item = await ctx.db
            .query("cart")
            .withIndex("by_productId", (q) => q.eq("productId", productId))
            .first();
        
        if (item) {
            await ctx.db.patch(item._id, {quantity: item.quantity + 1});
        }
    }
});

export const decrement = mutation({
    args: {
        productId: v.number()
    },
    handler: async (ctx, {productId}) => {
        const item = await ctx.db 
            .query("cart")
            .withIndex("by_productId", (q) => q.eq("productId", productId))
            .first();
        
        if (item) {
            if (item.quantity === 1) {
                await ctx.db.delete(item._id);
            } else {
                await ctx.db.patch(item._id, {quantity: item.quantity - 1});
            }
        }
        
    }
})