# react-native-scroll-indicator

> It's a simple react-native component made to help you to create your awesome custom scroll indicators. It's support only ScrollView for now. But in the next version it should support FlatList.

## Usage
1. Install the repository
    `npm i react-native-scroll-indicator`
    or
    `yarn add react-native-scroll-indicator`


2. Add an import to the top of your file
    ```javascript
    import ScrollViewIndicator from 'react-native-scroll-indicator';
    ```
3. Use it just as normal ScrollView but with some custom props.
    ```javascript
    <ScrollViewIndicator>
        <Content />
    </ScrollViewIndicator>
    ```
    
## Component Props

| Props                | Type              | Description                                                                                                                                                                                     | Default |
|----------------------|-------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| flexibleIndicator               | bool             | Set to `false` if you want to set your indicator a fixed height | true      |
| indicatorHeight              | num               | Height of indicator. Use with `flexibleIndicator`                                                                                                                                                                       | 200       |
| shouldIndicatorHide               | bool   | Set to `true` if you want to hide Indicator when scroll is idle | true
| hideTimeout | num | Time of show/hide indicator animation in `ms`   | 500    |
| style     | style            | Style of container | {} |
| scrollViewStyle     | style            | Style of ScrollView component | {} |
| scrollIndicatorContainerStyle     | style            | Style of scroll indicator container | {} |
| scrollIndicatorStyle     | style            | Style on scroll indicator | {} |
