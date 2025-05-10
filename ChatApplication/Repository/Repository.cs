using System.Linq.Expressions;
using ChatApplication.Data;
using ChatApplication.Repository.IRepository;
using Microsoft.EntityFrameworkCore;

namespace ChatApplication.Repository;

public class Repository<T> : IRepository<T> where T : class
{
    private readonly ChatAppContext _chatAppContext;
    internal DbSet<T> DbSet;


    public Repository(ChatAppContext chatAppContext)
    {
        _chatAppContext = chatAppContext;
        DbSet = _chatAppContext.Set<T>();
    }

    public async Task<IEnumerable<T>> GetallAsync()
    {
        IQueryable<T> query = DbSet;

        return await query.ToListAsync();
    }


    public async Task<IEnumerable<T>> GetAsync(Expression<Func<T, bool>>? filter)
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