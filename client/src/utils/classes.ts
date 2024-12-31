export default function classes(
  ...args: (string | undefined | null | false)[]
) {
  return args.filter((args) => args).join(" ");
}
