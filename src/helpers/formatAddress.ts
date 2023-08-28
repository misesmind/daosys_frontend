const formatAddress = (address: string, chars = 4) => {
    if (!address || address.length === 0) return '';
    return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}

export default formatAddress;