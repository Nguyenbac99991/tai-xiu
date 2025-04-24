import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function TaiXiuGame() {
  const [dice, setDice] = useState([1, 1, 1]);
  const [result, setResult] = useState("");
  const [choice, setChoice] = useState(null);
  const [balance, setBalance] = useState(100000);
  const [bet, setBet] = useState(1000);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);

  const rollDice = () => Math.floor(Math.random() * 6) + 1;

  const handlePlay = (userChoice) => {
    const newDice = [rollDice(), rollDice(), rollDice()];
    const total = newDice.reduce((a, b) => a + b, 0);
    const isTriple = newDice[0] === newDice[1] && newDice[1] === newDice[2];
    let gameResult = "";

    if (isTriple) {
      gameResult = "Hòa do bộ ba";
    } else if (total >= 11 && total <= 17) {
      gameResult = "Tài";
    } else {
      gameResult = "Xỉu";
    }

    if (gameResult === userChoice) {
      setBalance(balance + bet);
      setWins(wins + 1);
      setResult(`🎉 Bạn thắng! Kết quả: ${gameResult} (Tổng: ${total})`);
    } else if (isTriple) {
      setResult(`🤝 Hòa! Kết quả là bộ ba ${newDice[0]} (Tổng: ${total})`);
    } else {
      setBalance(balance - bet);
      setLosses(losses + 1);
      setResult(`❌ Bạn thua! Kết quả: ${gameResult} (Tổng: ${total})`);
    }
    setDice(newDice);
    setChoice(userChoice);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4">
      <Card className="p-4 shadow-xl">
        <CardContent>
          <h1 className="text-2xl font-bold mb-4 text-center">🎲 Game Tài Xỉu</h1>

          <div className="text-4xl text-center my-4">
            {dice.map((d, i) => (
              <span key={i}>{["", "⚀", "⚁", "⚂", "⚃", "⚄", "⚅"][d]} </span>
            ))}
          </div>

          <div className="flex justify-center gap-2 my-4">
            {[1000, 5000, 10000, 50000, 100000].map((amount) => (
              <Button
                key={amount}
                onClick={() => setBet(amount)}
                variant={bet === amount ? "default" : "outline"}
              >
                {amount.toLocaleString()}đ
              </Button>
            ))}
          </div>

          <div className="flex justify-center gap-4 my-4">
            <Button onClick={() => handlePlay("Tài")}>Chọn Tài</Button>
            <Button onClick={() => handlePlay("Xỉu")}>Chọn Xỉu</Button>
          </div>

          <div className="text-center text-lg font-medium mt-4">
            {result || "Hãy chọn Tài hoặc Xỉu để bắt đầu!"}
          </div>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            💰 Số dư: {balance.toLocaleString()}đ | ✅ Thắng: {wins} | ❌ Thua: {losses}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
