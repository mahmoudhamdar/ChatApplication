using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Repository.IRepository;

namespace WebApplication1.Repository;

public class Repository<T> : IRepository<T> where T : class
{
    private readonly ChatAppContext _chatAppContext;
    internal DbSet<T> DbSet;


    public Repository(ChatAppContext chatAppContext)
    {
        _chatAppContext = chatAppContext;
        DbSet = _chatAppContext.Set<T>();
    }

    public async Task<ICollection<T>> GetallAsync()
    {
        IQueryable<T> query = DbSet;

        return await query.ToListAsync();
    }


    public async Task<ICollection<T>> GetAsync(Expression<Func<T, bool>>? filter)
    {
        IQueryable<T> query = DbSet;
        return await query.Where(filter).ToListAsync();
    }

    public async Task AddAsync(T entity)
    {
        await DbSet.AddAsync(entity);
        await SaveAsync();
    }


    public async Task DeleteAsync(T entity)
    {
        DbSet.Remove(entity);
        await SaveAsync();
    }

    public async Task SaveAsync()
    {
        await _chatAppContext.SaveChangesAsync();
    }
}