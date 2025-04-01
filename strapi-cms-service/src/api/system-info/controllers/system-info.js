'use strict';

/**
 * system-info controller
 */

const getMetrics = async (ctx) => {

    try {
        const metrics = await strapi.db.query('api::system-info.system-info').findOne({
            select: [
                'listedValue',
                'transactions',
                'accesses',
                'successfully',
                'amount',
                'duration',
                'latestBank',
                'deposited',
                'videoViews',
                'withdrawn',
                'members',
                'remaining',
                'online',
                'hasExpiry',
                'lastUpdated'
            ],
            where: { id: 1 }
        });

        return {
            data: metrics
        };  
    } catch (err) {
        ctx.throw(500, err);
    }
}

const updateMetrics = async (ctx) => {
    try {
        const {
            listedValue,
            transactions,
            accesses,
            successfully,
            amount,
            duration,
            latestBank,
            deposited,
            videoViews,
            withdrawn,
            members,
            remaining,
            online,
            hasExpiry
        } = ctx.request.body.data;

        const existingMetrics = await strapi.db.query('api::system-info.system-info').findOne({
            where: { id: 1 }
        }); 

        const data = {
            listedValue: listedValue || existingMetrics?.listedValue,
            transactions: transactions || existingMetrics?.transactions,
            accesses: accesses || existingMetrics?.accesses,
            successfully: successfully || existingMetrics?.successfully,
            amount: amount || existingMetrics?.amount,
            duration: duration || existingMetrics?.duration,
            latestBank: latestBank || existingMetrics?.latestBank,
            deposited: deposited || existingMetrics?.deposited,
            videoViews: videoViews || existingMetrics?.videoViews,
            withdrawn: withdrawn || existingMetrics?.withdrawn,
            members: members || existingMetrics?.members,
            remaining: remaining || existingMetrics?.remaining,
            online: online || existingMetrics?.online,
            hasExpiry: hasExpiry !== undefined ? hasExpiry : existingMetrics?.hasExpiry,
            lastUpdated: new Date()
        };

        let metrics;
        if (existingMetrics) {
            metrics = await strapi.db.query('api::system-info.system-info').update({
                where: { id: 1 },
                data
            }); 
        } else {
            metrics = await strapi.db.query('api::system-info.system-info').create({
                data
            });
        }   

        return {
            data: metrics
        };
    } catch (err) {
        ctx.throw(500, err);
    }
}   

module.exports = {
    getMetrics,
    updateMetrics
}