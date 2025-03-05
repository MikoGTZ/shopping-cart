import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const register = mutation({
    args: {
        name: v.string(),
        email: v.string(),
        passwordHash: v.string()
    },
    handler: async (ctx, {name, email, passwordHash }) => {
        const existingUser = await ctx.db
            .query("user")
            .withIndex("by_email", (q) => q.eq("email", email))
            .first();

        if (existingUser) {
            console.log("Email already registered");
        } else {
            await ctx.db.insert("user", {name, email, passwordHash})
        }
    },
});

export const login = mutation({
    args: {
        email: v.string(),
        passwordHash: v.string()
    },
    handler: async (ctx, {email, passwordHash}) => {
        const user = await ctx.db
            .query("user")
            .withIndex("by_email", (q) => q.eq("email", email))
            .first();

        if (!user) {
            console.log("Invalid email or password");
        };

        return user;

        
    }
})

