const logger = (store) => (next) => (action) => {
  const result = next(action);

  console.group(action.type);
  console.log('Action: ', action);
  console.log('State: ', store.getState());
  console.groupEnd();

  return result;
}

export default logger;
