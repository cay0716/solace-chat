export const mockReplies = [
  "당신은 무엇으로 보았나요?",
  "그렇게 보이게 한 것은 무엇인가요?",
  "그 감정은 어디에서 왔다고 생각하나요?"
];

export function getMockReply() {
  const random = Math.floor(Math.random() * mockReplies.length);
  return mockReplies[random];
}