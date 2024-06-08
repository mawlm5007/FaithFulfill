import { Observable } from 'rxjs';
import type { Unsubscribable } from 'rxjs';
interface Observer {
    distance: number;
    is_close: boolean;
    is_toggle: boolean;
    is_double_toggle: boolean;
}
export type SubscriptionRef = Unsubscribable;
declare const _default: Observable<Observer>;
export default _default;
//# sourceMappingURL=index.d.ts.map