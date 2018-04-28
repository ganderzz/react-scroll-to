export default function getDisplayName(Component) {
    const { displayName, name } = Component;

    if (displayName || name) {
        return displayName || name;
    } else if (typeof Component === 'string' && Component.length > 0) {
        return Component;
    }

    return "Unknown";
  }