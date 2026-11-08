// =============================================
//  MOCK DATA — replaces the dead API responses
// =============================================

export const MOCK_USERS = [
  {
    _id: "u1",
    name: "youssef khaled",
    email: "youssef@gmail.com",
    photo: "https://i.pravatar.cc/150?img=11",
    gender: "male",
  },
  {
    _id: "u2",
    name: "Sara Mohamed",
    email: "sara@example.com",
    photo: "https://i.pravatar.cc/150?img=47",
    gender: "female",
  },
  {
    _id: "u3",
    name: "Omar Khaled",
    email: "omar@example.com",
    photo: "https://i.pravatar.cc/150?img=33",
    gender: "male",
  },
  {
    _id: "u4",
    name: "Nour Ali",
    email: "nour@example.com",
    photo: "https://i.pravatar.cc/150?img=56",
    gender: "female",
  },

];

export const MOCK_POSTS = [
  {
    _id: "p1",
    id: "p1",
    body: "Mental illness doesn't always have a 'look.' You can be smiling, working, and showing up while fighting a war inside. Be kind to everyone you meet",
    image: "https://cdn.brewersassociation.org/wp-content/uploads/2024/05/29100101/illustration-of-person-with-harmonious-mental-health-1200x800-1.jpg",
    createdAt: "2024-05-10T14:30:00.000Z",
    user: MOCK_USERS[0],
    likes: ["u2", "u3", "u4"],
    comments: [
      {
        _id: "c1",
        content: "I needed this today. I feel like a fraud when I’m struggling but still 'functional.' Thanks for the reminder.",
        commentCreator: MOCK_USERS[1],
        createdAt: "2024-05-10T15:00:00.000Z",
      },
      {
        _id: "c2",
        content: "yess",
        commentCreator: MOCK_USERS[2],
        createdAt: "2024-05-10T15:30:00.000Z",
      },
    ],
  },
  {
    _id: "p2",
    id: "p2",
    body: "Depression tried to keep me in bed all day, but I got up and made it. It’s not a mountain, but it’s my victory for Tuesday.",

    createdAt: "2024-05-09T08:00:00.000Z",
    user: MOCK_USERS[1],
    likes: ["u1", "u3"],
    comments: [
      {
        _id: "c3",
        content: "Huge win! Some days, brushing your teeth is an Olympic sport. Proud of you!",
        commentCreator: MOCK_USERS[3],
        createdAt: "2024-05-09T08:45:00.000Z",
      },
    ],
  },
  {
    _id: "p3",
    id: "p3",
    body: "Does anyone else feel like they have 50 browser tabs open and they can’t find where the music is coming from? Brain fog is real today.",
    image: "https://d2j2uxe7jasn0r.cloudfront.net/watermarks/image/rDtN98Qoishumwih/scratches-vector-element_GJ1gXoUO_SB_PM.jpg",
    createdAt: "2024-05-08T20:15:00.000Z",
    user: MOCK_USERS[2],
    likes: ["u1", "u2", "u4"],
    comments: [],
  },
  {
    _id: "p4",
    id: "p4",
    body: "Self-care isn't just bath bombs. Sometimes it’s the hard stuff: setting a boundary, saying no, or finally booking that therapy session.",
    image: "https://images.pexels.com/photos/35342046/pexels-photo-35342046.jpeg",
    createdAt: "2024-05-07T19:00:00.000Z",
    user: MOCK_USERS[3],
    likes: ["u1"],
    comments: [
      {
        _id: "c4",
        content: "True. Real self-care is often the stuff we don't want to do, but our future selves will thank us for",
        commentCreator: MOCK_USERS[0],
        createdAt: "2024-05-07T19:30:00.000Z",
      },
    ],
  },
  {
    _id: "p5",
    id: "p5",
    body: "The storm passed. If you're in the middle of a panic attack right now, just breathe with me. $4-7-8$ rhythm. You are safe. This will end.",
    image: "https://images.unsplash.com/photo-1562793350-25418e4f7eae?q=80&w=564&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    createdAt: "2024-05-06T07:30:00.000Z",
    user: MOCK_USERS[0],
    likes: ["u2", "u3"],
    comments: [
      {
        _id: "c5",
        content: "Thank you. I needed that.",
        commentCreator: MOCK_USERS[2],
        createdAt: "2024-05-06T08:00:00.000Z",
      },
    ],
  },
  {
    _id: "p5",
    id: "p5",
    body: "If you can't make your own neurotransmitters, store-bought is fine. Taking medication for mental health is just as valid as taking it for asthma.",
   
    createdAt: "2024-05-06T07:30:00.000Z",
    user: MOCK_USERS[0],
    likes: ["u2", "u3"],
    comments: [
      {
        _id: "c5",
        content: "Preach! No shame in needing a little chemical help to get through the day.",
        commentCreator: MOCK_USERS[2],
        createdAt: "2024-05-06T08:00:00.000Z",
      },
    ],
  },
  
];

// Fake logged-in user stored in localStorage on mock login
export const MOCK_LOGGED_IN_USER = MOCK_USERS[0];
