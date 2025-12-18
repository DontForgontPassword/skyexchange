import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useNftStore } from '@/shared/store/useNftStore'
import { useUser } from '@/shared/store/useUser'

const usePurchase = () => {
    const nfts = useNftStore()
    const user = useUser.getState()
    const navigate = useNavigate()

    const purchase = (name: string, price: number) => {
        const defaultBalance = user.getDefaultBalance()
        if (!user.token) {
            toast.error('Please sign in to purchase NFTs')
            return navigate('/login')
        }

        if (price <= defaultBalance.value) {
            nfts.setPurchased(name, true)
            user.remove(defaultBalance.name, price)
            user.save({
                id: crypto.randomUUID(),
                name,
            })
            toast.success(`Successfully purchased ${name}`)
        } else
            toast.error(
                `Insufficient funds. You need ${(
                    price - defaultBalance.value
                ).toFixed(2)} more`,
            )
    }

    return { purchase }
}

export { usePurchase }
