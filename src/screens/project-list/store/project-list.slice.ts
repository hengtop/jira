import { createSlice } from "@reduxjs/toolkit";

interface State {
  projectModalOpen: boolean;
}

const initialState: State = {
  projectModalOpen: false,
};

export const projectListSlice = createSlice({
  name: "projectListSlice",
  initialState,
  reducers: {
    openProjectModal(state) {
      // 这里的写法看似直接修改state中的属性，但其实内部帮我们新建了一个对象我们对state的操作都会被映射到这个新对象中（内部使用immer）
      state.projectModalOpen = true;
    },
    closeProjectModal(state) {
      state.projectModalOpen = false;
    },
  },
});
