import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    cart: defineTable({
        userId: v.string(),
        productId: v.number(),
        name: v.string(),
        price: v.number(),
        quantity: v.number()
    })
    .index("by_userId", ["userId"])
    .index("by_productId", ["productId"])
    .index("by_userId_productId", ["userId", "productId"]),

    product: defineTable({
        productId: v.number(),
        name: v.string(),
        price: v.number(),
    }).index("by_productId", ["productId"]),

    user: defineTable({
        email: v.string(),
        passwordHash: v.string(),
        name: v.string()
    }).index("by_email", ["email"])
})