/**
 * Store of app
 * @description Store of app
 * @author Zhong Li
 * @version 1.0.0
 * @since v1.0.0
 */

import { setSideBarOpenStatus, getSideBarOpenStatus } from "@system/cookie/app";

const state = {
  sideBar: {
    opened: getSideBarOpenStatus() ? !!+getSideBarOpenStatus() : true,
  },
  tagView: {
    activated: [],
  },
};

const mutations = {
  toggleSideBar: (state) => {
    state.sideBar.opened = !state.sideBar.opened;
    if (state.sideBar.opened) {
      setSideBarOpenStatus(1);
    } else {
      setSideBarOpenStatus(0);
    }
  },

  addActivated: (state, view) => {
    if (state.tagView.activated.some((v) => v.path === view.path)) return;
    state.tagView.activated.push(view);
  },

  delActivated: (state, view) => {
    for (const [i, v] of state.tagView.activated.entries()) {
      if (v.path === view.path) {
        state.tagView.activated.splice(i, 1);
        break;
      }
    }
  },
};

const actions = {
  toggleSideBar: ({ commit }) => {
    commit("toggleSideBar");
  },

  addActivated: ({ commit }, view) => {
    commit("addActivated", view);
  },

  delActivated: ({ commit }, view) => {
    commit("delActivated", view);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
