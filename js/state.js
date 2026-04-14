export const state = {
    tasks: [],
    comments: [],
    activity: [],
    members: [],
    labels: [],
    guestId: null,
    supabase: null,
    useSupabase: false,
  
    dragTaskId: null,
  
    search: "",
    filterPriority: "all",
    filterAssignee: "all",
    filterLabel: "all",
  
    openModal: null,
    selectedTaskId: null,
    selectedColumnId: "todo",
  };