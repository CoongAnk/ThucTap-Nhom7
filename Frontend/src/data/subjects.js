export const subjects = [
  {
    slug: "toan",
    grade: "Toán lớp 1",
    title: "Chương 1: Số tự nhiên",
    description:
      "Làm chủ các số từ 0 đến 100, phép cộng và trừ cơ bản.",

    lessons: [
      {
        slug: "dem-so",
        title: "Bài học: Đếm hạt dẻ",
        type: "drag-drop",
        done: true,
        data: {
          question: "Hãy kéo 7 hạt dẻ vào chiếc hộp.",
          required: 7,
          item: "🌰"
        }
      },
      {
        slug: "phep-cong",
        title: "Phép cộng cơ bản",
        type: "theory",
        done: false,
        content: `
Phép cộng là phép toán cộng hai số lại với nhau.

Ví dụ:
3 + 4 = 7
10 + 5 = 15
        `
      }
    ]
  }
];