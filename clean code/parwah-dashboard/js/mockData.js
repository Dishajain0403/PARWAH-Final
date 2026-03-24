/**
 * mockData.js
 * Centralized data for the Parwah Dashboard
 */

const mockData = {
    workshops: [
        { id: 1, title: "Managing Exam Stress", date: "Nov 8, 2024 • 4:00 PM", host: "Ms. Priya Kapoor", spots: 12, icon: "📖", description: "Learn effective techniques to stay calm and focused during exam season." },
        { id: 2, title: "Building Confidence", date: "Nov 10, 2024 • 3:30 PM", host: "Mr. Rohan Mehta", spots: 8, icon: "💪", description: "Practical exercises to boost self-esteem and public speaking confidence." },
        { id: 3, title: "Healthy Study Habits", date: "Nov 12, 2024 • 5:00 PM", host: "Dr. Ananya Rao", spots: 15, icon: "🧠", description: "Optimize your learning environment and improve retention." },
        { id: 4, title: "Art Therapy Session", date: "Nov 14, 2024 • 4:00 PM", host: "Ms. Kavita Joshi", spots: 10, icon: "🎨", description: "Express yourself through creative arts to reduce anxiety." },
        { id: 5, title: "Mindful Breathing 101", date: "Nov 16, 2024 • 3:00 PM", host: "Mr. Vikram Singh", spots: 20, icon: "🧘", description: "Master basic mindfulness techniques for daily stress management." },
        { id: 6, title: "Journaling for Clarity", date: "Nov 18, 2024 • 4:30 PM", host: "Ms. Neha Sharma", spots: 6, icon: "📝", description: "Use the power of writing to process emotions and gain perspective." }
    ],
    activities: [
        { id: 1, title: "Calm Breathing", icon: "🫧", description: "Follow the circle and breathe in sync to calm your nervous system.", type: "Game" },
        { id: 2, title: "Color Match", icon: "🎨", description: "Tap the matching colors. Simple & soothing focus game.", type: "Game" },
        { id: 3, title: "Gratitude Garden", icon: "🌸", description: "Plant a flower for each thing you're grateful for today.", type: "Game" },
        { id: 4, title: "Memory Pairs", icon: "🃏", description: "Flip cards and find matching pairs to sharpen your focus.", type: "Game" }
    ],
    courses: [
        { 
          id: 1, title: "Understanding Emotions", lessons: [
            { id: 1, title: "What are Emotions?", duration: "5 mins", content: "Emotions are complex psychological states that involve three distinct components: a subjective experience, a physiological response, and a behavioral or expressive response." },
            { id: 2, title: "Identifying Your Triggers", duration: "8 mins", content: "Learn to recognize the situations, people, or events that lead to intense emotional responses." },
            { id: 3, title: "Healthy Expression", duration: "10 mins", content: "Discover constructive ways to communicate how you feel without hurting others or yourself." }
          ], 
          duration: "4 weeks", desc: "Learn to identify and manage your emotions.", icon: "💡", progress: 60, fullDescription: "This course covers the science of emotions and practical management techniques." 
        },
        { 
          id: 2, title: "Stress-Free Study Techniques", lessons: [
            { id: 1, title: "The Pomodoro Method", duration: "6 mins", content: "A time management system that encourages people to work with the time they have—rather than against it." },
            { id: 2, title: "Active Recall", duration: "12 mins", content: "Active recall is a principle of efficient learning, which claims the need to actively stimulate memory during the learning process." }
          ], 
          duration: "3 weeks", desc: "Study effectively without burnout.", icon: "📚", progress: 30, fullDescription: "Proven methods to improve productivity while maintaining wellness." 
        },
        { 
          id: 3, title: "Building Healthy Friendships", lessons: [
            { id: 1, title: "Communication Skills", duration: "7 mins", content: "The foundation of any good relationship is clear and honest communication." }
          ], 
          duration: "2 weeks", desc: "Make and maintain meaningful friendships.", icon: "🤝", progress: 0, fullDescription: "Conflict resolution and social skills for adolescents." 
        },
        { 
          id: 4, title: "Digital Wellness for Teens", lessons: [
            { id: 1, title: "Screen Time Balance", duration: "10 mins", content: "Strategies for finding a healthy middle ground with technology use." }
          ], 
          duration: "2 weeks", desc: "Balance screen time and build healthier habits.", icon: "📱", progress: 0, fullDescription: "Healthy habits for the digital age." 
        }
    ],
    counselors: [
        { id: 1, name: "Dr. Meera Patel", specialty: "Anxiety & Stress", icon: "👤" },
        { id: 2, name: "Ms. Ritu Agarwal", specialty: "Relationships & Social Growth", icon: "👤" },
        { id: 3, name: "Mr. Anil Kumar", specialty: "Academic Motivation", icon: "👤" }
    ],
    announcements: [
        { id: 1, title: "New Yoga Session Added", date: "Oct 24, 2024", content: "We have added a new morning yoga session every Friday at 7 AM. Join us on the school grounds!", icon: "🧘" },
        { id: 3, title: "Mental Health Awareness Week", date: "Oct 20, 2024", content: "Join us for a week of activities and talks dedicated to mental wellness.", icon: "🎗️" }
    ]
};

// If using in browser, expose globally
if (typeof window !== 'undefined') {
    window.mockData = mockData;
}
