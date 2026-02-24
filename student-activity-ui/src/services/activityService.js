export const activityService = {
    getActivities: (userId = null) => {
        const activities = JSON.parse(localStorage.getItem('activities') || '[]');
        if (userId) {
            return activities.filter(a => a.userId === userId);
        }
        return activities;
    },

    addActivity: (activityData, userId) => {
        const activities = JSON.parse(localStorage.getItem('activities') || '[]');
        const newActivity = {
            ...activityData,
            userId,
            id: Date.now(),
            status: 'pending' // Default status
        };
        activities.push(newActivity);
        localStorage.setItem('activities', JSON.stringify(activities));
        return newActivity;
    },

    updateActivity: (id, updatedData) => {
        const activities = JSON.parse(localStorage.getItem('activities') || '[]');
        const index = activities.findIndex(a => a.id === id);
        if (index !== -1) {
            activities[index] = { ...activities[index], ...updatedData };
            localStorage.setItem('activities', JSON.stringify(activities));
            return activities[index];
        }
        return null;
    },

    approveActivity: (id) => {
        return activityService.updateActivity(id, { status: 'approved' });
    },

    rejectActivity: (id) => {
        return activityService.updateActivity(id, { status: 'rejected' });
    },

    deleteActivity: (id) => {
        const activities = JSON.parse(localStorage.getItem('activities') || '[]');
        const filtered = activities.filter(a => a.id !== id);
        localStorage.setItem('activities', JSON.stringify(filtered));
    }
};
