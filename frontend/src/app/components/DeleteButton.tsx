"use client";

type DeleteButtonProps = {
  blogId: number;
};

export default function DeleteButton({ blogId }: DeleteButtonProps) {
  const handleDelete = async () => {
    if (confirm("この記事を削除しますか？")) {
      try {
        const response = await fetch(`/api/blog`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: blogId }),
        });
        
        if (response.ok) {
          window.location.href = "/";
        } else {
          alert("削除に失敗しました");
        }
      } catch (error) {
        console.error("削除エラー:", error);
        alert("削除に失敗しました");
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
    >
      削除
    </button>
  );
}
