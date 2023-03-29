export type MutationFunction<TResult, TVariables = unknown> = (
  variables: TVariables
) => Promise<TResult>;
