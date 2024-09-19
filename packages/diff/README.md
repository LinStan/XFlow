[English (US)](README.md) | 简体中文

# XFlow Diff

XFlow Diff 是一个用于跟踪、比较和合并图形结构（如节点和边）差异的工具，适用于图形编辑器
和可视化应用。

## 目录

- [特性](#特性)
- [安装](#安装)
- [使用示例](#使用示例)

## 特性

- 支持对比不同版本的图形状态。
- 支持自定义比较函数和变更详情面板的展示。

## 安装

您可以通过 npm 安装 XFlow Diff：

```shell
# npm
$ npm install @antv/xflow --save

# yarn
$ yarn add @antv/xflow

# pnpm
$ pnpm add @antv/xflow
```

## 使用示例

请参照：apps/basic/src/pages/diff/index.tsx

```tsx
import React from 'react';
import { DiffGraph } from '@antv/xflow-diff';

const originalData = {
  nodes: [
    { id: 'node1', label: 'Node 1' },
    { id: 'node2', label: 'Node 2' },
  ],
  edges: [{ source: 'node1', target: 'node2' }],
};

const currentData = {
  nodes: [
    { id: 'node1', label: 'Node 1' },
    { id: 'node2', label: 'Node 2' },
    { id: 'node3', label: 'Node 3' },
  ],
  edges: [
    { source: 'node1', target: 'node2' },
    { source: 'node2', target: 'node3' },
  ],
};

const App = () => {
  return (
    <DiffGraph
      originalData={originalData}
      currentData={currentData}
      showDiffDetail={true}
    />
  );
};
```

## API 详情

```tsx
export interface DiffGraphOptions {
  /** 原始数据 */
  originalData: GraphData;
  /** 变更后数据 */
  currentData: GraphData;
  /** 新增颜色 */
  addColor?: string;
  /** 新增节点扩展属性 */
  addExtAttr?: object;
  /** 删除颜色 */
  delColor?: string;
  /** 删除节点扩展属性 */
  delExtAttr?: object;
  /** 变更颜色 */
  changeColor?: string;
  /** 变更节点扩展属性 */
  changeExtAttr?: object;
  /** 画布配置 */
  graphOptions?: GraphOptions;
  /** 展示diff详情 */
  showDiffDetail?: boolean;
  /** 自定义渲染diff详情 */
  customRenderDiffDetail?: (detail: DiffInfo[]) => React.ReactNode;
  /** 节点描述字段属性key  */
  nodeDescKey?: string;
  /** 边描述字段属性key  */
  edgeDescKey?: string;
}
```
