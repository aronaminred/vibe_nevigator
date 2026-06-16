type AdSlotProps = {
  label: string;
};

export function AdSlot({ label }: AdSlotProps) {
  return (
    <aside className="ad-slot" aria-label={label}>
      <strong>광고 자리</strong>
      <span>결과 화면 체류 시간을 수익화할 위치입니다.</span>
    </aside>
  );
}
