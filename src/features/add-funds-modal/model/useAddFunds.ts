import { toast } from 'sonner'
import { ICoin } from '@/shared/store/useExchangeStore'
import { useUser } from '@/shared/store/useUser'

const useAddFunds = () => {
    const user = useUser.getState()
    const defaultBalance = user.getDefaultBalance()
    const add = user.add

    const exchange = (coin: ICoin, amount: number) => {
        if (!amount || amount < 0) {
            toast.warning('Please fill amount of currency')
            return
        }

        if (defaultBalance.value < amount) {
            toast.error('You have not enough currency')
            return
        }

        const smgAmount = coin.rate * amount

        add('smg', smgAmount)

        toast.success(
            `Successfully exchanged ${amount} ${coin.name} for ${smgAmount}`,
        )
    }

    return { exchange }
}

export { useAddFunds }
