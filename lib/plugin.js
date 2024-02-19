import Vue from 'vue'
import VueAnalytics from 'vue-analytics'

export default async (ctx, inject) => {
  const runtimeConfig = ctx.$config && ctx.$config.googleAnalytics || {}
  const moduleOptions = <%= serialize(options) %>
  const options = {...moduleOptions, ...runtimeConfig}

  if (typeof options.asyncID === 'function') {
    const host = ctx.req ? ctx.req.headers.host : window.location.host;
    options.id = await options.asyncID(ctx, host)
  }

  Vue.use(VueAnalytics, {...{ router: ctx.app.router }, ...options})

  ctx.$ga = Vue.$ga
  inject('ga', Vue.$ga)
}
