type Item = {
  id: number;
  parentId?: number | null;
};

export type TreeItem<T extends Item> = T & { children: TreeItem<T>[] };

export const createTree = <T extends Item>(dataset: T[]): TreeItem<T>[] => {
  const treeMap: Record<string, TreeItem<T>> = {};
  dataset.forEach((el) => (treeMap[el.id] = { ...el, children: [] }));
  const dataTree: TreeItem<T>[] = [];
  dataset.forEach((el) => {
    if (!!el.parentId) {
      treeMap[el.parentId].children.push(treeMap[el.id]);
    } else dataTree.push(treeMap[el.id]);
  });
  return dataTree;
};
