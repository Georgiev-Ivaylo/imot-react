import ListItem from "components/estates/ListItem";

const ListSkeleton = () => {
  let items = [];
  for (let i = 0; i < 9; ++i) {
    items.push(
      <ListItem
        estate={{}}
        key={`fantom_${i}`}
        fantomKey={`fantom_${i}`}
        isHidden={true}
      />
    );
  }
  return <ul className="box-grid">{items}</ul>;
};

export default ListSkeleton;
