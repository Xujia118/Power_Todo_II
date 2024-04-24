sessions = { 
  sid1: { user1 },
  sid2: { user2 },
};

users = {
  user1: {
    taskId1: {
      name: taskName,
      date: taskDate,
      finished: false, // true when all the notes are finished
      urgent: false,
      notes: {
        noteId1: {
          name: noteName1,
          date: noteDate1,
          finished: false, // toggle to make true of false
        },
        noteId2: {
          name: noteName2,
          date: noteDate2,
          finished: true, // toggle to make true of false
        },
        // Add more notes as needed
      },
    },
  },
};
