const { forwardTo } = require('prisma-binding');
const { hasPermission } = require('../utils');

const Query = {
    items          : forwardTo('db'),
    item           : forwardTo('db'),
    itemsConnection: forwardTo('db'),
    me(parent, args, ctx, info) {
        // check if there's a current user ID
        if(!ctx.request.userId) {
            return null;
        }
        return ctx.db.query.user(
            {
                where: { id: ctx.request.userId }
            }, 
            info
        );
    },
    async users(parent, args, ctx, info) {
        // Check if user is logged in
        if(!ctx.request.userId) {
            throw new Error('You must be logged in');
        }

        // check if user has permissions to query all users
        hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE']);

        // if they do, query all the users
        return ctx.db.query.users({}, info);
    }, 
    async order(parent, args, ctx, info) {
        // make sure they're logged in
        if(!ctx.request.userId) {
            throw new Error('You need to be logged in!');
        }

        // query the current order
        const order = await ctx.db.query.order({
            where: { id: args.id },
        }, info);

        // check if they have permissions
        const ownsOrder               = order.user.id === ctx.request.userId;
        const hasPermissionToSeeOrder = ctx.request.user.permissions.includes('ADMIN');

        if(!ownsOrder || !hasPermissionToSeeOrder) {
            throw new Error('Sorry, you don\'t have permission to view this order');
        }

        // return the order
        return order;
    },
    async orders(parent, args, ctx, info) {
        const { userId} = ctx.request;
        if(!userId) {
            throw new Error('You need to be logged in!');
        }
        return ctx.db.query.orders({
            where: {
                user: { id: userId }
            }
        }, info);
    }
};

module.exports = Query;
