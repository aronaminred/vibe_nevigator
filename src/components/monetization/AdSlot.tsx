type AdSlotProps = {
  label: string;
};

export function AdSlot({ label }: AdSlotProps) {
  return (
    <aside className="ad-slot" aria-label={label}>
      <strong>{label}</strong>
      <span>광고 또는 후원 콘텐츠를 배치할 수 있는 자리입니다.</span>
    </aside>
  );
}
