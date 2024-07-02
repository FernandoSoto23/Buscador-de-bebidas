import { create } from 'zustand';
import { devtools } from 'zustand/middleware'
import { RecipiesSliceType, createRecipiSlice } from './recipiSlice';
import { FavoritesSliceType,createFavoritesSlice } from './favoritesSlice';
import { createNotificationSlice, NotificationSliceType } from './notificationSlice';
export const useAppStore = create<RecipiesSliceType & FavoritesSliceType & NotificationSliceType>()(devtools((...a) => ({
    ...createRecipiSlice(...a),
    ...createFavoritesSlice(...a),
    ...createNotificationSlice(...a)
})));