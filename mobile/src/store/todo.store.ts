import { create } from "zustand";
import { api } from "../lib/api";

export type Todo = {
  id: string;
  title: string;
  dueDate: string;
  isCompleted: boolean;
};

type TodoState = {
  todos: Todo[];
  completedTodos: Todo[];
  loading: boolean;
  error: string | null;

  fetchTodos: () => Promise<void>;
  fetchCompletedTodos: () => Promise<void>;
  addTodo: (title: string, dueDate: string) => Promise<void>;
  completeTodo: (id: string) => Promise<void>;
};

export const useTodoStore = create<TodoState>((set, get) => ({
  todos: [],
  completedTodos: [],
  loading: false,
  error: null,

  fetchTodos: async () => {
    set({ loading: true, error: null });
    try {
      const res = await api.get("/todo/user");

      const todos = res.data.map((t: any) => ({
        id: t.id,
        title: t.title,
        dueDate: t.dueDate,
        isCompleted: t.isCompleted ?? false,
      }));
      
      set({ todos });
    } catch (err: any) {
      set({ error: err.response?.data?.error ?? "Failed to fetch todos" });
    } finally {
      set({ loading: false });
    }
  },

  fetchCompletedTodos: async () => {
    set({ loading: true, error: null });
    try {
      const res = await api.get("/todo/user/completed");
      set({ completedTodos: res.data });
    } catch (err: any) {
      set({ error: err.response?.data?.error ?? "Failed to fetch completed todos" });
    } finally {
      set({ loading: false });
    }
  },

  addTodo: async (title, dueDate) => {
    set({ loading: true, error: null });
    try {
      await api.post("/todo/add", { title, dueDate });
      await get().fetchTodos();
    } catch (err: any) {
      set({ error: err.response?.data?.error ?? "Failed to add todo" });
    } finally {
      set({ loading: false });
    }
  },

  completeTodo: async (id) => {
    set({ loading: true, error: null });
    try {
      await api.post(`/todo/${id}/complete`);
      await get().fetchTodos();
      await get().fetchCompletedTodos();
    } catch (err: any) {
      set({ error: err.response?.data?.error ?? "Failed to complete todo" });
    } finally {
      set({ loading: false });
    }
  },
}));