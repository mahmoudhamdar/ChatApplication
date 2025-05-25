using System.Linq.Expressions;

namespace WebApplication1.Repository.IRepository;

public interface IRepository<T>
{
    public Task<ICollection<T>> GetallAsync();
    public Task<ICollection<T>> GetAsync(Expression<Func<T, bool>>? filter = null);
    public Task AddAsync(T entity);

    public Task DeleteAsync(T entity);

    public Task SaveAsync();
}